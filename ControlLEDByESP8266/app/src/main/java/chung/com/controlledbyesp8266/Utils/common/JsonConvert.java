package chung.com.controlledbyesp8266.Utils.common;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by chuna on 25/03/2018.
 */

public class JsonConvert<T> implements JsonConvertImpl<T> {
    final Class<T> typeParameterClass;

    public JsonConvert(Class<T> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    @Override
    public JSONObject object2Json(T light) {
        try {
            return new JSONObject(new Gson().toJson(light).toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public T jsonToObject(String mJsonString) {
        JsonParser parser = new JsonParser();
        JsonElement mJson = parser.parse(mJsonString);
        Gson gson = new Gson();

        T object = gson.fromJson(mJson, typeParameterClass);
        return object;
    }
}
