package chung.com.controlledbyesp8266.Utils.common;

import org.json.JSONObject;

/**
 * Created by chuna on 25/03/2018.
 */

public interface JsonConvertImpl<T> {
    public JSONObject object2Json(T light);
    public T jsonToObject(String mJsonString);
}
