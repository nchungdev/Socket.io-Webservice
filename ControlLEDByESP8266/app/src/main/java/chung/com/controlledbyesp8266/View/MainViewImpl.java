package chung.com.controlledbyesp8266.View;

import chung.com.controlledbyesp8266.Model.Light;

/**
 * Created by chuna on 25/03/2018.
 */

public interface MainViewImpl {
    void loadListLightSuccess();

    void loadListLightFailure();

    void updateLightSuccess(Light light);

    void updateLightFailure(Light light);
}
