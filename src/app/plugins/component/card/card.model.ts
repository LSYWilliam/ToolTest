/**
 * 卡片组件入参实体类
 * @class CardModel
 */
export class CardModel {
    cardName: string;
    cardPrompt: string;
    cardStyle: any;
    cardTitleStyle: any;
    tipPlacement: boolean;
    cardContentStyle: any;
    noBorderShow: boolean;
    isHovering: boolean;

    constructor(cardInput: CardInterface) {
        if (cardInput.cardName) {
            this.cardName = cardInput.cardName;
        } else {
            this.cardName = '';
        }

        if (cardInput.cardPrompt) {
            this.cardPrompt = cardInput.cardPrompt;
        } else {
            this.cardPrompt = '';
        }

        if (cardInput.noBorderShow || cardInput.noBorderShow === false) {
            this.noBorderShow = cardInput.noBorderShow;
        } else {
            this.noBorderShow = true;
        }

        if (cardInput.tipPlacement || cardInput.tipPlacement === false) {
            this.tipPlacement = cardInput.tipPlacement;
        } else {
            this.tipPlacement = true;
        }

        if (cardInput.isHovering || cardInput.isHovering === false) {
            this.isHovering = cardInput.isHovering;
        } else {
            this.isHovering = true;
        }

        if (cardInput.cardStyle) {
            this.cardStyle = cardInput.cardStyle;
        } else {
            this.cardStyle = {};
        }

        if (cardInput.cardTitleStyle) {
            this.cardTitleStyle = cardInput.cardTitleStyle;
        } else {
            this.cardTitleStyle = {};
        }

        if (cardInput.cardContentStyle) {
            this.cardContentStyle = cardInput.cardContentStyle;
        } else {
            this.cardContentStyle = {};
        }
    }
}
