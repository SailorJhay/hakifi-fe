import classnames from 'classnames';
import { mainIndicators, subIndicators } from './constantsTrading';
import IndicatorIcon from '../common/Icons/IndicatorIcon';
import FullScreenIcon from '../common/Icons/FullScreenIcon';

interface IIndicatorBarsProps {
    onChangeIndicator: (key: string, val: string) => void
    mainIndicator: any
    subIndicator: any
    fullScreen: boolean
    setFullScreen: (e: boolean) => void
    onShowIndicator: () => void
    isDetail: boolean
    isMobile: boolean
}

const IndicatorBars = ({ onChangeIndicator, mainIndicator, subIndicator, fullScreen, setFullScreen, onShowIndicator, isDetail, isMobile }: IIndicatorBarsProps) => {
    const setIndicator = (item: string, key: string) => {
        let value = ''
        if (key === 'main') {
            value = mainIndicator === item ? '' : item
        } else {
            value = subIndicator === item ? '' : item
        }
        onChangeIndicator(key, value)
    }

    return (
        <div className={classnames(`px-4 h-10 flex items-center justify-between border-y border-divider`)}>
            <div className="flex items-center text-xs text-txtSecondary justify-between w-full">
                <IndicatorIcon onClick={onShowIndicator} />
                {mainIndicators.map((item) => (
                    <div key={item.value} className={mainIndicator === item.value ? 'text-txtPrimary font-medium' : ''} onClick={() => setIndicator(item.value, 'main')}>
                        {item.label}
                    </div>
                ))}
                <div className="bg-divider w-[2px] h-4" />
                {subIndicators.map((item) => (
                    <div key={item.value} className={subIndicator === item.value ? 'text-txtPrimary font-medium' : ''} onClick={() => setIndicator(item.value, 'sub')}>
                        {item.label}
                    </div>
                ))}
                {isMobile && !isDetail && (
                    <FullScreenIcon onClick={() => setFullScreen(!fullScreen)} />
                )}
            </div>
        </div>
    )
}

export default IndicatorBars
