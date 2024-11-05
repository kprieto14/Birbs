import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ReactElement } from "react";

export function AuthenticationGuard({ component }: any) {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div>

            </div>
        )
    })

    return <Component />
}
