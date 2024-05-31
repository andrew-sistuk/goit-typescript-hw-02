import { ChangeEvent, FormEvent } from 'react';
import { Color, ContentFilter, OrderBy, Orientation } from '../../apiService/unsplashApi.types';

type HandleChangeSelect = (evt: ChangeEvent<HTMLSelectElement>) => void;

export type Props = {
    orientation: Orientation;
    color: Color;
    content_filter: ContentFilter;
    order_by: OrderBy;
    handleSetOrientation: HandleChangeSelect;
    handleSetColor: HandleChangeSelect; 
    handleSetContentFilter: HandleChangeSelect;
    handleSetOrderBy: HandleChangeSelect;
    resetFilters: () => void,
};
