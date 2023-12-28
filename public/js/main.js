import  Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './input.js';
import Entity from './Entity.js';
import { createAudioLoader } from './loaders/audio.js';
import { loadFont } from './loaders/font.js';
import { createDashboardLayer } from './tiles/chance.js';


class AudioBoard {
    constructor(context) {
        this.context = context;
        this.buffers = new Map();
        this.isMuted = false;

    }

    addAudio(name, buffer) {
        this.buffers.set(name, buffer);
    }
    playAudio(name) {
        if (!this.isMuted) { // Check if not muted
            const source = this.context.createBufferSource();
            source.connect(this.context.destination);
            source.buffer = this.buffers.get(name);
            source.start(0);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted; // Toggle mute state
    }

}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const volumeImage = document.getElementById("volume-on");
const close = document.getElementById('close')
const instructionIcon = document.getElementById('instruction-icon')
const instruction = document.getElementById('instruction')





Promise.all([
    createMario(),
    loadLevel('1-1'),
    loadFont()

])
    .then(([mario, level, font]) => {
        mario.pos.set(64, 64);
        // console.log("mario pos: ", mario.pos)
        const audioContext = new AudioContext()
        const audioBoard = new AudioBoard(audioContext)
        const loadAudio = createAudioLoader(audioContext);
        loadAudio('/audio/jump.ogg')
            .then(buffer => {
                audioBoard.addAudio('jump', buffer)
                // audioBoard.playAudio('jump')
            })
        level.entities.add(mario);
        level.comp.layers.push(createDashboardLayer(font))

        const input = setupKeyboard(mario);
        input.listenTo(window);

        // ['mousedown', 'mousemove'].forEach(eventName => {
        //     canvas.addEventListener(eventName, event => {
        //         if (event.buttons === 1) {
        //             mario.vel.set(0, 0);
        //             mario.pos.set(event.offsetX, event.offsetY);
        //         }
        //     });
        // });

        volumeImage.addEventListener("click", toggleVolume);
       
  

        function toggleVolume() {
            console.log("toggle volume clicked")
            audioBoard.toggleMute();

            // Change the src attribute of the image based on mute state
            if (audioBoard.isMuted) {
                volumeImage.src = "https://img.icons8.com/material-sharp/48/FFFFFF/no-audio.png";
            } else {
                volumeImage.src = "https://img.icons8.com/material-sharp/48/FFFFFF/high-volume--v1.png";
            }
        }

        //  close.addEventListener('click', closeInstructions)
        // function closeInstructions() {
        //     console.log("close clicked")
        //     instruction.style.display = 'none';
        // }

        function openInstructions() {
            console.log("open clicked")
            instruction.style.display = 'block';
        }

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            level.update(deltaTime, audioBoard);

            if (mario.pos.getX() > 390) {
                mario.pos.setX(0)

            }

            //  console.log("mario position: ", mario.pos.get())
            if (mario.pos.getX() < 0) {
                mario.pos.setX(390)
            }

            level.comp.draw(context);
            // font.draw('A', context, 0, 0)
        }

        timer.start();
    });





