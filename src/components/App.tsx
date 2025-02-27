
import { PlaceCardProps } from '../types';
import Main from './Main';

export default function App({data}: {data: PlaceCardProps[]}): JSX.Element {
  return (
    <Main cards={data} />
  );
}

