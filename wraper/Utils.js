class Utils {
    static setGlobalVariable( key, value ) {
        pm.globals.set( key, JSON.stringify( value ) );
    }

    static getGlobalVariable(key) {
        return pm.globals.get(key);
    }

    static clearGlobalVariable(key) {
        pm.globals.unset(key);
    }

    static hasGlobalVariable( key )
    {
        return pm.globals.has( key );
    }

    static setEnvironmentVariable( key, value ) {
        pm.environment.set( key, JSON.stringify( value ) );
    }
    // deprecated
    static setObjectEnvironmentVariable(key, value) {
        this.setEnvironmentVariable(key, JSON.stringify(value));
    }

    static getEnvironmentVariable(key) {
        return pm.environment.get(key);
    }

    static getObjectEnvironmentVariable(key) {
        return JSON.parse(this.getEnvironmentVariable(key));
    }

    static clearEnvironmentVariable(key) {
        pm.environment.unset(key);
    }

    static hasEnvironmentVariable( key )
    {
        return pm.environment.has( key );
    }

    static getVariable(key) {
        return pm.variables.get(key);
    }

    static setVariable( key, value ) {
        pm.variables.set( key, JSON.stringify( value ) );
    }

    // 不支援有重複相同屬性名稱的JSON
    static getValueFromJsonString(jsonString, key) {
        let value = null;
        JSON.parse(jsonString,
            (property, data) => {
                if (property === key) {
                    value = data;
                }
                return data;
            }
        );
        return value;
    }
    // 不支援有重複相同屬性名稱的JSON
    static getValueObjectFromJsonString(jsonString, ...keys) {
        let vo = {};
        for (let i = 0; i < keys.length; i++) {
            vo[keys[i]] = null;
        }

        JSON.parse(jsonString,
            (property, data) => {
                if (vo.hasOwnProperty(property)) {
                    vo[property] = data;
                }
                return data;
            }
        );
        return vo;
    }

    static getQueryStringFromObject(query_object) {
        let query_list = [];
        for (let i in query_object) {
            // 只將 value 有值的組成 array
            if (query_object[i]) {
                query_list.push(`${i}=${query_object[i]}`);
            }
        }
        // array 有值才會組字串
        return query_list.length > 0 ? `?${query_list.join('&')}` : '';
    }

    static testCurRequestBodyWithObject(CurRequestBdoy, post_request_json_body) {
        for (let i in post_request_json_body) {
            Tests[`Test ${i}`] = JSON.stringify(post_request_json_body[i]) === JSON.stringify(CurRequestBdoy[i]);
        }
    }
}
