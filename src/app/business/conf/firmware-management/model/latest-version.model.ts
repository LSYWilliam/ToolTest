export class LatestVersionModel {

    /** 候补版本 */
    private _candidateVersion: string;
    /** 补丁版本 */
    private _patchyVersion: string;
    /** 标准版本 */
    private _standardVersion: string;

    get candidateVersion(): string {
        return this._candidateVersion;
    }

    set candidateVersion(value: string) {
        this._candidateVersion = value;
    }

    get patchyVersion(): string {
        return this._patchyVersion;
    }

    set patchyVersion(value: string) {
        this._patchyVersion = value;
    }

    get standardVersion(): string {
        return this._standardVersion;
    }

    set standardVersion(value: string) {
        this._standardVersion = value;
    }

}

