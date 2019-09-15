import {VersionModel} from "../../../../shared/component/net-web/version.model";

export class FirmwareTypeModel {

    /** 标准版本 */
    private _standardVersion: VersionModel = new VersionModel();
    /** 候补版本 */
    private _candidateVersion: VersionModel = new VersionModel();
    /** 补丁版本 */
    private _patchyVersion: VersionModel = new VersionModel();

    get standardVersion(): VersionModel {
        return this._standardVersion;
    }

    set standardVersion(value: VersionModel) {
        this._standardVersion = value;
    }

    get candidateVersion(): VersionModel {
        return this._candidateVersion;
    }

    set candidateVersion(value: VersionModel) {
        this._candidateVersion = value;
    }

    get patchyVersion(): VersionModel {
        return this._patchyVersion;
    }

    set patchyVersion(value: VersionModel) {
        this._patchyVersion = value;
    }

    public toString() {
        return {
            'standardVersion': this._standardVersion ||  '' ,
            'candidateVersion': this._candidateVersion || '',
            'patchyVersion': this._patchyVersion || ''
        };
    }
}
