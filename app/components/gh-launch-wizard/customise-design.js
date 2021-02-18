import Component from '@glimmer/component';
import {
    ICON_EXTENSIONS,
    ICON_MIME_TYPES,
    IMAGE_EXTENSIONS,
    IMAGE_MIME_TYPES
} from 'ghost-admin/components/gh-image-uploader';
import {action} from '@ember/object';
import {htmlSafe} from '@ember/string';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency-decorators';
import {timeout} from 'ember-concurrency';

export default class GhLaunchWizardCustomiseDesignComponent extends Component {
    @service ajax;
    @service config;
    @service ghostPaths;
    @service settings;

    iconExtensions = ICON_EXTENSIONS;
    iconMimeTypes = ICON_MIME_TYPES;
    imageExtensions = IMAGE_EXTENSIONS;
    imageMimeTypes = IMAGE_MIME_TYPES;

    get accentColor() {
        const color = this.settings.get('accentColor');
        if (color && color[0] === '#') {
            return color.slice(1);
        }
        return color;
    }

    get accentColorPickerValue() {
        return this.settings.get('accentColor') || '#ffffff';
    }

    get accentColorBgStyle() {
        return htmlSafe(`background-color: ${this.accentColorPickerValue}`);
    }

    get previewData() {
        const params = new URLSearchParams();

        params.append('c', this.accentColorPickerValue);
        params.append('icon', this.settings.get('icon'));
        params.append('logo', this.settings.get('logo'));
        params.append('cover', this.settings.get('coverImage'));

        return params.toString();
    }

    willDestroy() {
        this.settings.rollbackAttributes();
    }

    @action
    triggerFileDialog({target}) {
        target.closest('.gh-setting-action')?.querySelector('input[type="file"]')?.click();
    }

    @action
    async imageUploaded(property, results) {
        if (results[0]) {
            this.settings.set(property, results[0].url);
            this.updatePreviewTask.perform();
        }
    }

    @action
    async removeImage(imageName) {
        this.settings.set(imageName, '');
        this.updatePreviewTask.perform();
    }

    @action
    async updateAccentColor(event) {
        let newColor = event.target.value;
        const oldColor = this.settings.get('accentColor');

        // reset errors and validation
        this.settings.errors.remove('accentColor');
        this.settings.hasValidated.removeObject('accentColor');

        if (newColor === '') {
            if (newColor === oldColor) {
                return;
            }

            // clear out the accent color
            this.settings.set('accentColor', '');
            this.updatePreviewTask.perform();
            return;
        }

        // accentColor will be null unless the user has input something
        if (!newColor) {
            newColor = oldColor;
        }

        if (newColor[0] !== '#') {
            newColor = `#${newColor}`;
        }

        if (newColor.match(/#[0-9A-Fa-f]{6}$/)) {
            if (newColor === oldColor) {
                return;
            }

            this.settings.set('accentColor', newColor);
            this.updatePreviewTask.perform();
        } else {
            this.settings.errors.add('accentColor', 'The colour should be in valid hex format');
            this.settings.hasValidated.pushObject('accentColor');
        }
    }

    @task({restartable: true})
    *debounceUpdateAccentColor(event) {
        yield timeout(500);
        this.updateAccentColor(event);
    }

    @task
    *saveAndContinueTask() {
        try {
            yield this.settings.save();
            this.args.nextStep();
        } catch (error) {
            if (error) {
                this.notifications.showAPIError(error);
                throw error;
            }
        }
    }

    @task
    *updatePreviewTask() {
        const ajaxOptions = {
            contentType: 'text/html;charset=utf-8',
            dataType: 'text',
            headers: {
                'x-ghost-preview': this.previewData
            }
        };

        const frontendUrl = this.config.get('blogUrl');
        const previewContents = yield this.ajax.post(frontendUrl, ajaxOptions);

        this.args.replacePreviewContents(previewContents);
    }
}
