import Observable from './Observable';
import { itemStore } from '../model/ItemStore';
import { Item, Status } from '../../types';
import { STATUS } from '../common/constants';
import { API } from '../common/util';

const ItemObservable = () => {
  const observer = Observable(itemStore);
  const changeSelectedFilter = (status: Status | '') => {
    observer.setData({
      ...observer.getData(),
      selectedFilter: status,
    });
  };
  const changeSelectedFilterToOpen = () => {
    changeSelectedFilter(STATUS.OPEN);
  };
  const changeSelectedFilterToClose = () => {
    changeSelectedFilter(STATUS.CLOSE);
  };
  const changeSelectedFilterToAll = () => {
    changeSelectedFilter('');
  };
  const getFilteredData = () => {
    const { initData, selectedFilter } = observer.getData();
    return initData.filter((data) => data.status.includes(selectedFilter));
  };
  const getOpensCount = () =>
    `${
      observer.getData().initData.filter((e) => e.status === STATUS.OPEN).length
    }`;
  const getClosedCount = () =>
    `${
      observer.getData().initData.filter((e) => e.status === STATUS.CLOSE)
        .length
    }`;
  const getSelectedFilter = () => observer.getData().selectedFilter;
  API.GET<Item[]>({
    url: './data-sources/issues.json',
    errorMessage: '초기데이터 로딩에 실패했습니다.',
  }).then((data) => {
    observer.setData({
      initData: data,
      selectedFilter: '',
    });
  });
  const subscribe = observer.subscribe;

  return {
    changeSelectedFilterToClose,
    changeSelectedFilterToOpen,
    changeSelectedFilterToAll,
    getFilteredData,
    getOpensCount,
    getClosedCount,
    subscribe,
    getSelectedFilter,
  };
};
const itemObserver = ItemObservable();

export { itemObserver };
