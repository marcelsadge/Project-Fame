import React from "react";

import { InfoColumn, InfoHomePage, InfoRow, InfoContainer } from "./styles";

function Info() {
    return (
        <InfoHomePage>
            <InfoColumn>
                <InfoRow>
                    <InfoContainer>
                        Info
                    </InfoContainer>
                </InfoRow>
            </InfoColumn>
        </InfoHomePage>
    );
}

export default Info;