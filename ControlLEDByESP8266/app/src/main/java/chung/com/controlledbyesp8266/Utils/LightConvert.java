package chung.com.controlledbyesp8266.Utils;

import chung.com.controlledbyesp8266.Model.Light;
import chung.com.controlledbyesp8266.Utils.common.JsonConvert;
import chung.com.controlledbyesp8266.Utils.common.JsonConvertImpl;

/**
 * Created by chuna on 25/03/2018.
 */

public class LightConvert extends JsonConvert<Light> implements JsonConvertImpl<Light> {
    public LightConvert(Class<Light> typeParameterClass) {
        super(typeParameterClass);
    }
}
