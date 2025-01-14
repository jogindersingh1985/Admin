import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency-decorators';
import {tracked} from '@glimmer/tracking';

export default class SettingsDesignIndexController extends Controller {
    @service config;
    @service customThemeSettings;
    @service notifications;
    @service settings;
    @service themeManagement;

    @tracked previewSize = 'desktop';

    get isDesktopPreview() {
        return this.previewSize === 'desktop';
    }

    get isMobilePreview() {
        return this.previewSize === 'mobile';
    }

    @action
    setPreviewSize(size) {
        this.previewSize = size;
    }

    @task
    *saveTask() {
        try {
            if (this.settings.get('errors').length !== 0) {
                return;
            }

            yield Promise.all([
                this.settings.save(),
                this.customThemeSettings.save()
            ]);

            // ensure task button switches to success state
            return true;
        } catch (error) {
            if (error) {
                this.notifications.showAPIError(error);
                throw error;
            }
        }
    }
}
