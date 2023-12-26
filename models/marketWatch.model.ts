const getPairKey = (symbol: string) => {
    if (symbol) {
        let baseAsset: string = '',
            quoteAsset: string = '';

        if (symbol?.includes('VNDC')) quoteAsset = 'VNDC';
        if (symbol?.includes('USDT')) quoteAsset = 'USDT';

        baseAsset = symbol?.replace(quoteAsset, '');

        return {
            baseAsset,
            quoteAsset,
        };
    }
};

export interface Ticker {
    ask: number;
    baseAsset: string;
    bid: number;
    fundingRate: number;
    fundingTime: number;
    highPrice: number;
    lastPrice: number;
    lastQuantity: number;
    lowPrice: number;
    openPrice: number;
    priceChange: number;
    priceChangePercent: number;
    quoteAsset: string;
    symbol: string;
}

type Option = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    baseAssetVolume: string;
    quoteAssetVolume: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    lastPrice: string;
    priceChange: string;
    priceChangePercent: string;
    lastQuantity: string;
    firstTradeId: string;
    lastTradeId: string;
    eventType: string;
    eventTime: string;
    totalNumberOfTrades: string;
    statisticsOpenTime: string;
    statisticsCloseTime: string;
    weightedAveragePrice: string;
    ask: string;
    bid: string;
    fundingRate: string;
    fundingTime: string;
};

class MarketWatch {
   symbol: string;
   baseAsset: string;
   quoteAsset: string;
   baseAssetVolume: string;
   quoteAssetVolume: string;
   openPrice: string;
   highPrice: string;
   lowPrice: string;
   lastPrice: string;
   priceChange: string;
   priceChangePercent: string;
   lastQuantity: string;
   firstTradeId: string;
   lastTradeId: string;
   eventType: string;
   eventTime: string;
   totalNumberOfTrades: string;
   statisticsOpenTime: string;
   statisticsCloseTime: string;
   weightedAveragePrice: string;
   ask: string;
   bid: string;
   fundingRate: string;
   fundingTime: string;

    constructor(options: Option) {
        this.symbol = options.symbol;
        this.baseAsset = options.baseAsset;
        this.quoteAsset = options.quoteAsset;
        this.baseAssetVolume = options.baseAssetVolume;
        this.quoteAssetVolume = options.quoteAssetVolume;
        this.openPrice = options.openPrice;
        this.highPrice = options.highPrice;
        this.lowPrice = options.lowPrice;
        this.lastPrice = options.lastPrice;
        this.priceChange = options.priceChange;
        this.priceChangePercent = options.priceChangePercent;
        this.lastQuantity = options.lastQuantity;
        this.firstTradeId = options.firstTradeId;
        this.lastTradeId = options.lastTradeId;
        this.eventType = options.eventType;
        this.eventTime = options.eventTime;
        this.totalNumberOfTrades = options.totalNumberOfTrades;
        this.statisticsOpenTime = options.statisticsOpenTime;
        this.statisticsCloseTime = options.statisticsCloseTime;
        this.weightedAveragePrice = options.weightedAveragePrice;
        this.ask = options.ask;
        this.bid = options.bid;
        this.fundingRate = options.fundingRate;
        this.fundingTime = options.fundingTime;
    }

    static create(source: any) {
        const pairKey = getPairKey(source?.s);
        return new MarketWatch({
            symbol: source?.s,
            baseAsset: pairKey?.baseAsset,
            quoteAsset: pairKey?.quoteAsset,
            baseAssetVolume: +source?.v || 0,
            quoteAssetVolume: +source?.q || 0,
            openPrice: +source?.o || 0,
            highPrice: +source?.h || 0,
            lowPrice: +source?.l || 0,
            lastPrice: +source?.c || 0,
            priceChange: +source?.ld || 0,
            priceChangePercent: +source?.lcp || 0,
            // lastQuantity: +source?.Q || 0,
            // firstTradeId: source?.F,
            // lastTradeId: source?.L,
            // eventType: source?.e,
            // eventTime: source?.E,
            // totalNumberOfTrades: source?.n,
            // statisticsOpenTime: source?.O,
            // statisticsCloseTime: source?.C,
            // weightedAveragePrice: +source?.w,
            ask: source?.ap,
            bid: source?.bp,
            fundingRate: source?.r || 0,
            fundingTime: source?.ft,
        });
    }
}

export default MarketWatch;
