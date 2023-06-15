import { createStore } from 'vuex';
import { PhotoType, PhotoArrayType } from "@/types/Camera.type";

export default createStore({
    state: {
        Camera: {
            photos: [] as PhotoArrayType
        }
    },
    mutations: {
        clearCameraPhotos(state) {
            state.Camera.photos = [];
        },
        prependCameraPhoto(state, savedFileImage: PhotoType) {
            state.Camera.photos.unshift(savedFileImage);
        },
        appendCameraPhoto(state, savedFileImage: PhotoType) {
            state.Camera.photos.push(savedFileImage);
        }
    }
});
