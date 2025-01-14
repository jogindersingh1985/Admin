import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class ViewThemeModalComponent extends Component {
    @service modals;
    @service router;

    willDestroy() {
        super.willDestroy(...arguments);

        // leave install modal visiible if it's in the success state because
        // we're switching over to the design customisation screen in the bg
        // and don't want to auto-close when this modal closes
        if (this.installModal && !this.showingSuccessModal) {
            this.installModal.close();
        }
    }

    @action
    installTheme() {
        this.installModal = this.modals.open('modals/design/install-theme', {
            theme: this.args.data.theme,
            onSuccess: () => {
                this.showingSuccessModal = true;
                this.router.transitionTo('settings.design');
            }
        });
    }
}
