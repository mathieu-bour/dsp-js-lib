import { Observable } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../../endpoint";
import { ApiResponseData } from "../../../models/api-response-data";
import { ApiResponseError } from "../../../models/api-response-error";
import { UserList } from "../../..";
import { LoginResponse } from "../../../models/v2/login-response";
import { LogoutResponse } from "../../../models/v2/logout-response";

export class AuthenticationEndpoint extends Endpoint {

    ///////////////
    // CONSTANTS //
    ///////////////

    // <editor-fold desc="">
    // </editor-fold>

    ////////////////
    // PROPERTIES //
    ////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////////
    // CONSTRUCTOR //
    /////////////////

    // <editor-fold desc="">
    // </editor-fold>

    /////////////
    // METHODS //
    /////////////

    // <editor-fold desc="">

    /**
     * Logs in a user.
     */
    login(username: string, password: string): Observable<ApiResponseData<LoginResponse> | ApiResponseError> {

        return this.httpPost("", {
            username: username,
            password: password
        }).pipe(
            map((ajaxResponse: AjaxResponse) => {
                // Make sure the web token is stored.
                const responseData = ApiResponseData.fromAjaxResponse(ajaxResponse, LoginResponse, this.jsonConvert);
                this.jsonWebToken = responseData.body.token;
                return responseData;
            } ),
            catchError(error => this.handleError(error))
        );

    }

    /**
     * Logs out the user and destroys the session server- and client-side.
     */
    logout(): Observable<ApiResponseData<LogoutResponse> | ApiResponseError> {

        return this.httpDelete("").pipe(
            map((ajaxResponse: AjaxResponse) => {
                // Make sure the web token is removed.
                const responseData = ApiResponseData.fromAjaxResponse(ajaxResponse, LogoutResponse, this.jsonConvert);
                this.jsonWebToken = "";
                return responseData;
            } ),
            catchError(error => this.handleError(error))
        );

    }

    // </editor-fold>

}