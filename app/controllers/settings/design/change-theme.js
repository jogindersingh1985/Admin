import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class ChangeThemeController extends Controller {
    @service store;
    @service themeManagement;

    @tracked showAdvanced = false;
    @tracked themes = this.store.peekAll('theme');

    marketplaceThemes = [{
        name: 'Journal',
        category: 'Newsletter',
        url: 'https://github.com/TryGhost/Journal',
        previewUrl: 'https://journal.ghost.io/',
        ref: 'TryGhost/Journal',
        image: 'assets/img/themes/Journal.png'
    }, {
        name: 'Edition',
        category: 'Newsletter',
        url: 'https://github.com/TryGhost/Edition',
        previewUrl: 'https://edition.ghost.io/',
        ref: 'TryGhost/Edition',
        image: 'assets/img/themes/Edition.png'
    }, {
        name: 'Digest',
        category: 'Newsletter',
        url: 'https://github.com/TryGhost/Digest',
        previewUrl: 'https://digest.ghost.io/',
        ref: 'TryGhost/Digest',
        image: 'assets/img/themes/Digest.png'
    }, {
        name: 'Bulletin',
        category: 'Newsletter',
        url: 'https://github.com/TryGhost/Bulletin',
        previewUrl: 'https://bulletin.ghost.io/',
        ref: 'TryGhost/Bulletin',
        image: 'assets/img/themes/Bulletin.png'
    }, {
        name: 'Dawn',
        category: 'Newsletter',
        url: 'https://github.com/TryGhost/Dawn',
        previewUrl: 'https://dawn.ghost.io/',
        ref: 'TryGhost/Dawn',
        image: 'assets/img/themes/Dawn.png'
    }, {
        name: 'Alto',
        category: 'Blog',
        url: 'https://github.com/TryGhost/Alto',
        previewUrl: 'https://alto.ghost.io',
        ref: 'TryGhost/Alto',
        image: 'assets/img/themes/Alto.png'
    }, {
        name: 'Edge',
        category: 'Photography',
        url: 'https://github.com/TryGhost/Edge',
        previewUrl: 'https://edge.ghost.io',
        ref: 'TryGhost/Edge',
        image: 'assets/img/themes/Edge.png'
    }, {
        name: 'Ease',
        category: 'Documentation',
        url: 'https://github.com/TryGhost/Ease',
        previewUrl: 'https://ease.ghost.io',
        ref: 'TryGhost/Ease',
        image: 'assets/img/themes/Ease.png'
    }, {
        name: 'Ruby',
        category: 'Magazine',
        url: 'https://github.com/TryGhost/Ruby',
        previewUrl: 'https://ruby.ghost.io',
        ref: 'TryGhost/Ruby',
        image: 'assets/img/themes/Ruby.png'
    }, {
        name: 'Dope',
        category: 'Magazine',
        url: 'https://github.com/TryGhost/Dope',
        previewUrl: 'https://dope.ghost.io',
        ref: 'TryGhost/Dope',
        image: 'assets/img/themes/Dope.png'
    }, {
        name: 'Wave',
        category: 'Podcast',
        url: 'https://github.com/TryGhost/Wave',
        previewUrl: 'https://wave.ghost.io',
        ref: 'TryGhost/Wave',
        image: 'assets/img/themes/Wave.png'
    }, {
        name: 'London',
        category: 'Photography',
        url: 'https://github.com/TryGhost/London',
        previewUrl: 'https://london.ghost.io',
        ref: 'TryGhost/London',
        image: 'assets/img/themes/London.jpg'
    }, {
        name: 'Editorial',
        category: 'Magazine',
        url: 'https://github.com/TryGhost/Editorial',
        previewUrl: 'https://editorial.ghost.io',
        ref: 'TryGhost/Editorial',
        image: 'assets/img/themes/Editorial.jpg'
    }, {
        name: 'Massively',
        category: 'Magazine',
        url: 'https://github.com/TryGhost/Massively',
        previewUrl: 'https://massively.ghost.io',
        ref: 'TryGhost/Massively',
        image: 'assets/img/themes/Massively.jpg'
    }]

    @action
    toggleAdvanced() {
        this.showAdvanced = !this.showAdvanced;
    }
}
