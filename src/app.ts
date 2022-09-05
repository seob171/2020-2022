import {
    Composable,
    PageComponent,
    PageItemComponent,
} from './components/page/page.js'
import { ImageComponent } from './components/page/item/image.js'
import { NoteComponent } from './components/page/item/note.js'
import { TodoComponent } from './components/page/item/todo.js'
import { VideoComponent } from './components/page/item/video.js'
import { Component } from './components/component.js'
import { InputDialog } from './components/dialog/dialog.js'

class App {
    private readonly page: Component & Composable
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent)
        this.page.attachTo(appRoot)

        const image = new ImageComponent(
            'Image Title',
            'https://picsum.photos/600/300'
        )
        this.page.addChild(image)

        const note = new NoteComponent('Note Title', 'Body Content!')
        this.page.addChild(note)

        const todo = new TodoComponent('Todo Title', 'Todo Item')
        this.page.addChild(todo)

        const video = new VideoComponent(
            'Video Title',
            'https://www.youtube.com/embed/jlzJNEc3JLc'
        )
        this.page.addChild(video)

        const imageBtn = document.querySelector(
            '#new-image'
        )! as HTMLButtonElement
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog()

            dialog.setOncloseListener(() => {
                dialog.removeFrom(document.body)
            })

            dialog.setOnsubmitListener(() => {
                // 섹션을 만들어서 페이지에 추가 해준다.
                dialog.removeFrom(document.body)
            })

            dialog.attachTo(document.body)
        })
    }
}
// html에 document를 선언했으므로 !를 붙혀 null이 아니라고 정의하고 , HTMLElement 타입을 지정할 수 있다.
new App(document.querySelector('.document')! as HTMLElement)
