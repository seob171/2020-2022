import { PageComponent } from './components/page/page.js'
import { ImageComponent } from './components/page/item/image.js'
import { NoteComponent } from './components/page/item/note.js'
import { TodoComponent } from './components/page/item/todo.js'
import { VideoComponent } from './components/page/item/video.js'

class App {
    private readonly page: PageComponent
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent()
        this.page.attachTo(appRoot)

        const image = new ImageComponent(
            'Image Title',
            'https://picsum.photos/600/300'
        )
        image.attachTo(appRoot, 'beforeend')

        const note = new NoteComponent('Note Title', 'Body Content!')
        note.attachTo(appRoot, 'beforeend')

        const todo = new TodoComponent('Todo Title', 'Todo Item')
        todo.attachTo(appRoot, 'beforeend')

        const video = new VideoComponent(
            'Video Title',
            'https://www.youtube.com/embed/jlzJNEc3JLc'
        )
        video.attachTo(appRoot, 'beforeend')
    }
}
// html에 document를 선언했으므로 !를 붙혀 null이 아니라고 정의하고 , HTMLElement 타입을 지정할 수 있다.
new App(document.querySelector('.document')! as HTMLElement)
