
import { PlaceCardProps } from '../types';
import Main from './Main';

type AppProps = {
  data: PlaceCardProps[];
};

export default function App({data}: AppProps): JSX.Element {
  return (
    <Main cards={data} />
  );
}

