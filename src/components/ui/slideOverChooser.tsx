import {useCallback, useEffect, useState} from 'react';
import Loader from '@/components/loader';
import FlatList from 'flatlist-react';

export default function SlideOverChooser({options, isLoading, renderItem}: {
  options: any[],
  isLoading: boolean,
  renderItem: any,
}) {


  const [, updateState] = useState();
  const [isLoadingProp, setIsLoadingProp] = useState(isLoading);
  const forceUpdate = useCallback(() => updateState({} as any), []);

  useEffect(() => {
    setIsLoadingProp(isLoading);
  }, [isLoading]);

  return (
    <div>
      {isLoadingProp && <Loader/>}
      {!isLoadingProp &&
        <FlatList list={options}
                  renderItem={renderItem}/>}
    </div>
  );
}
