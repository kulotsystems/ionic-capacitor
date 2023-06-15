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
        },
        deleteCameraPhoto(state, photo: PhotoType) {
            state.Camera.photos = state.Camera.photos.filter(p => p.filepath !== photo.filepath);
        }
    },
    getters: {
        totalCameraPhotos(state) {
            return state.Camera.photos.length;
        }
    }
});
