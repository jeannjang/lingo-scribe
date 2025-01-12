import appReducer from '@/src/contentScript/component/store/appReducer';
import subtitleReducer from '@/src/contentScript/component/store/subtitleReducer';
import userReducer from '@/src/contentScript/component/store/userReducer';

const rootReducer = {
    app: appReducer,
    subtitle: subtitleReducer,
    user: userReducer,
};

export default rootReducer;
