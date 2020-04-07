import { put } from 'redux-saga/effects';

import SettingActions from '../ducks/settings';

import { settingModel } from '~/services/models/autoload';

export function* loadSetting() {
    try {
        const settings = yield settingModel.load();
        yield put(SettingActions.loadSettingSuccess(settings));
    } catch (error) {
        yield put(SettingActions.loadSettingSuccess(''));
    }
}