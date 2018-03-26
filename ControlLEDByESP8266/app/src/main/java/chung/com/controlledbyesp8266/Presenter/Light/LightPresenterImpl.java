package chung.com.controlledbyesp8266.Presenter.Light;

import chung.com.controlledbyesp8266.Model.Light;

/**
 * Created by chuna on 25/03/2018.
 */

public interface LightPresenterImpl {
    void loadListLight();
    void loadALight(String name);
    void updateStateLight(Light t);
}
