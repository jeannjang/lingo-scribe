import appReducer from '@/src/contentScript/component/store/appSlice';
import subtitleReducer from '@/src/contentScript/component/store/subtitleSlice';
import userReducer from '@/src/contentScript/component/store/userReducer';

const rootReducer = {
    app: appReducer,
    subtitle: subtitleReducer,
    user: userReducer,
};

export default rootReducer;
