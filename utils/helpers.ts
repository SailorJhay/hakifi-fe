function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
};

export const getBscAddressLink = (address: string) => {
  const bscScanLink =
    process.env.NEXT_PUBLIC_BSC_SCAN_URL || 'https://testnet.bscscan.com';
  return bscScanLink + '/address/' + address;
};

export const substring = (str: string, start = 10, end = -4) =>
  String(str).length > 10
    ? `${String(str).substr(0, start)}...${String(str).substr(end)}`
    : str;
export function isFunction(functionToCheck: any) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

export function handleRequest<T>(promise: Promise<T>) {
  return promise
    .then((data: T) => [undefined, data])
    .catch((err) => [err, undefined]);
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const drawline = ({
  line,
  chart,
  isUpdate,
  text,
  bodyBorderColor,
  bodyTextColor,
  extendLeft,
  lineColor,
  price,
}) => {
  if (isUpdate) return line.setText(text).setPrice(price);

  return chart
    .createOrderLine()
    .setText(text)
    .setBodyBorderColor(bodyBorderColor)
    .setBodyTextColor(bodyTextColor)
    .setExtendLeft(extendLeft)
    .setLineStyle(0)
    .setLineColor(lineColor)
    .setLineLength(100)
    .setQuantity('')
    .setPrice(price);
};
