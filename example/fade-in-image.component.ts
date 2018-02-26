import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'fade-in-image',
    styles: [`
        img {
            min-width: 1497px;
            width: 100%;
            min-height: 1127px;
            transition: opacity 1s;
            opacity: 0;
        }

        img.ng-lazyloaded {
            opacity: 1;
        }
    `],
    template: `
        <div *ngFor="let image of images">
            <div style="color: #000000;font-size: 30px;text-align: center">{{image.progress}}%</div>
            <img
                style="height: 100vh;width: 100vw"
                [defaultImage]="defaultImage"
                [errorImage]="errorImage"
                (onProgress)="onImageProgress($event,image)"
                [lazyLoad]="image.url">
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FadeInImageComponent {
    errorImage = 'https://i.imgur.com/XkU4Ajf.png';
    defaultImage = 'https://www.placecage.com/1000/1000';

    constructor(private cd: ChangeDetectorRef) {

    }

    images = [
        {url: 'https://images.unsplash.com/photo-1468413922365-e3766a17da9e?dpr=2&auto=compress,format&fit=crop&w=1199&h=800&q=80', progress: 0},
        {url: 'https://images.unsplash.com/photo-1488388373205-a134c1cc7e4e?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80', progress: 0},
        {url: 'https://images.unsplash.com/photo-1422257986712-4f02edc298ce?dpr=2&auto=compress,format&fit=crop&w=1199&h=1199&q=80', progress: 0}
    ];

    onImageProgress(event, img) {
        console.log("progress event => ", event);
        img.progress = Math.round(event.loaded * 100 / event.total);
        console.log(img);
        this.cd.detectChanges();
    }
}
