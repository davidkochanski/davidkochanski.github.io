import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import liveReload from 'vite-plugin-live-reload'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), liveReload('script/aboutMe.js')],
    server: {    
        // this ensures that the browser opens upon server start
        host: true,
        open: true,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        }
    },
})