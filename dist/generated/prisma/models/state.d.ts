import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model state
 *
 */
export type stateModel = runtime.Types.Result.DefaultSelection<Prisma.$statePayload>;
export type AggregateState = {
    _count: StateCountAggregateOutputType | null;
    _avg: StateAvgAggregateOutputType | null;
    _sum: StateSumAggregateOutputType | null;
    _min: StateMinAggregateOutputType | null;
    _max: StateMaxAggregateOutputType | null;
};
export type StateAvgAggregateOutputType = {
    id: number | null;
    countryId: number | null;
};
export type StateSumAggregateOutputType = {
    id: number | null;
    countryId: number | null;
};
export type StateMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
    createdAt: Date | null;
};
export type StateMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    countryId: number | null;
    createdAt: Date | null;
};
export type StateCountAggregateOutputType = {
    id: number;
    name: number;
    countryId: number;
    createdAt: number;
    _all: number;
};
export type StateAvgAggregateInputType = {
    id?: true;
    countryId?: true;
};
export type StateSumAggregateInputType = {
    id?: true;
    countryId?: true;
};
export type StateMinAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    createdAt?: true;
};
export type StateMaxAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    createdAt?: true;
};
export type StateCountAggregateInputType = {
    id?: true;
    name?: true;
    countryId?: true;
    createdAt?: true;
    _all?: true;
};
export type StateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which state to aggregate.
     */
    where?: Prisma.stateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of states to fetch.
     */
    orderBy?: Prisma.stateOrderByWithRelationInput | Prisma.stateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.stateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` states from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` states.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned states
    **/
    _count?: true | StateCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StateAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StateSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StateMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StateMaxAggregateInputType;
};
export type GetStateAggregateType<T extends StateAggregateArgs> = {
    [P in keyof T & keyof AggregateState]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateState[P]> : Prisma.GetScalarType<T[P], AggregateState[P]>;
};
export type stateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.stateWhereInput;
    orderBy?: Prisma.stateOrderByWithAggregationInput | Prisma.stateOrderByWithAggregationInput[];
    by: Prisma.StateScalarFieldEnum[] | Prisma.StateScalarFieldEnum;
    having?: Prisma.stateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StateCountAggregateInputType | true;
    _avg?: StateAvgAggregateInputType;
    _sum?: StateSumAggregateInputType;
    _min?: StateMinAggregateInputType;
    _max?: StateMaxAggregateInputType;
};
export type StateGroupByOutputType = {
    id: number;
    name: string;
    countryId: number;
    createdAt: Date;
    _count: StateCountAggregateOutputType | null;
    _avg: StateAvgAggregateOutputType | null;
    _sum: StateSumAggregateOutputType | null;
    _min: StateMinAggregateOutputType | null;
    _max: StateMaxAggregateOutputType | null;
};
type GetStateGroupByPayload<T extends stateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StateGroupByOutputType[P]>;
}>>;
export type stateWhereInput = {
    AND?: Prisma.stateWhereInput | Prisma.stateWhereInput[];
    OR?: Prisma.stateWhereInput[];
    NOT?: Prisma.stateWhereInput | Prisma.stateWhereInput[];
    id?: Prisma.IntFilter<"state"> | number;
    name?: Prisma.StringFilter<"state"> | string;
    countryId?: Prisma.IntFilter<"state"> | number;
    createdAt?: Prisma.DateTimeFilter<"state"> | Date | string;
    country?: Prisma.XOR<Prisma.CountryScalarRelationFilter, Prisma.countryWhereInput>;
    events?: Prisma.EventListRelationFilter;
};
export type stateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    country?: Prisma.countryOrderByWithRelationInput;
    events?: Prisma.EventOrderByRelationAggregateInput;
};
export type stateWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.stateWhereInput | Prisma.stateWhereInput[];
    OR?: Prisma.stateWhereInput[];
    NOT?: Prisma.stateWhereInput | Prisma.stateWhereInput[];
    name?: Prisma.StringFilter<"state"> | string;
    countryId?: Prisma.IntFilter<"state"> | number;
    createdAt?: Prisma.DateTimeFilter<"state"> | Date | string;
    country?: Prisma.XOR<Prisma.CountryScalarRelationFilter, Prisma.countryWhereInput>;
    events?: Prisma.EventListRelationFilter;
}, "id">;
export type stateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.stateCountOrderByAggregateInput;
    _avg?: Prisma.stateAvgOrderByAggregateInput;
    _max?: Prisma.stateMaxOrderByAggregateInput;
    _min?: Prisma.stateMinOrderByAggregateInput;
    _sum?: Prisma.stateSumOrderByAggregateInput;
};
export type stateScalarWhereWithAggregatesInput = {
    AND?: Prisma.stateScalarWhereWithAggregatesInput | Prisma.stateScalarWhereWithAggregatesInput[];
    OR?: Prisma.stateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.stateScalarWhereWithAggregatesInput | Prisma.stateScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"state"> | number;
    name?: Prisma.StringWithAggregatesFilter<"state"> | string;
    countryId?: Prisma.IntWithAggregatesFilter<"state"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"state"> | Date | string;
};
export type stateCreateInput = {
    name: string;
    createdAt?: Date | string;
    country: Prisma.countryCreateNestedOneWithoutStatesInput;
    events?: Prisma.EventCreateNestedManyWithoutStateInput;
};
export type stateUncheckedCreateInput = {
    id?: number;
    name: string;
    countryId: number;
    createdAt?: Date | string;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutStateInput;
};
export type stateUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    country?: Prisma.countryUpdateOneRequiredWithoutStatesNestedInput;
    events?: Prisma.EventUpdateManyWithoutStateNestedInput;
};
export type stateUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    countryId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.EventUncheckedUpdateManyWithoutStateNestedInput;
};
export type stateCreateManyInput = {
    id?: number;
    name: string;
    countryId: number;
    createdAt?: Date | string;
};
export type stateUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type stateUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    countryId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StateListRelationFilter = {
    every?: Prisma.stateWhereInput;
    some?: Prisma.stateWhereInput;
    none?: Prisma.stateWhereInput;
};
export type stateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type stateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type stateAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
};
export type stateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type stateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type stateSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    countryId?: Prisma.SortOrder;
};
export type StateNullableScalarRelationFilter = {
    is?: Prisma.stateWhereInput | null;
    isNot?: Prisma.stateWhereInput | null;
};
export type stateCreateNestedManyWithoutCountryInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput> | Prisma.stateCreateWithoutCountryInput[] | Prisma.stateUncheckedCreateWithoutCountryInput[];
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutCountryInput | Prisma.stateCreateOrConnectWithoutCountryInput[];
    createMany?: Prisma.stateCreateManyCountryInputEnvelope;
    connect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
};
export type stateUncheckedCreateNestedManyWithoutCountryInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput> | Prisma.stateCreateWithoutCountryInput[] | Prisma.stateUncheckedCreateWithoutCountryInput[];
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutCountryInput | Prisma.stateCreateOrConnectWithoutCountryInput[];
    createMany?: Prisma.stateCreateManyCountryInputEnvelope;
    connect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
};
export type stateUpdateManyWithoutCountryNestedInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput> | Prisma.stateCreateWithoutCountryInput[] | Prisma.stateUncheckedCreateWithoutCountryInput[];
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutCountryInput | Prisma.stateCreateOrConnectWithoutCountryInput[];
    upsert?: Prisma.stateUpsertWithWhereUniqueWithoutCountryInput | Prisma.stateUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: Prisma.stateCreateManyCountryInputEnvelope;
    set?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    disconnect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    delete?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    connect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    update?: Prisma.stateUpdateWithWhereUniqueWithoutCountryInput | Prisma.stateUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?: Prisma.stateUpdateManyWithWhereWithoutCountryInput | Prisma.stateUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: Prisma.stateScalarWhereInput | Prisma.stateScalarWhereInput[];
};
export type stateUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput> | Prisma.stateCreateWithoutCountryInput[] | Prisma.stateUncheckedCreateWithoutCountryInput[];
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutCountryInput | Prisma.stateCreateOrConnectWithoutCountryInput[];
    upsert?: Prisma.stateUpsertWithWhereUniqueWithoutCountryInput | Prisma.stateUpsertWithWhereUniqueWithoutCountryInput[];
    createMany?: Prisma.stateCreateManyCountryInputEnvelope;
    set?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    disconnect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    delete?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    connect?: Prisma.stateWhereUniqueInput | Prisma.stateWhereUniqueInput[];
    update?: Prisma.stateUpdateWithWhereUniqueWithoutCountryInput | Prisma.stateUpdateWithWhereUniqueWithoutCountryInput[];
    updateMany?: Prisma.stateUpdateManyWithWhereWithoutCountryInput | Prisma.stateUpdateManyWithWhereWithoutCountryInput[];
    deleteMany?: Prisma.stateScalarWhereInput | Prisma.stateScalarWhereInput[];
};
export type stateCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutEventsInput, Prisma.stateUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutEventsInput;
    connect?: Prisma.stateWhereUniqueInput;
};
export type stateUpdateOneWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.stateCreateWithoutEventsInput, Prisma.stateUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.stateCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.stateUpsertWithoutEventsInput;
    disconnect?: Prisma.stateWhereInput | boolean;
    delete?: Prisma.stateWhereInput | boolean;
    connect?: Prisma.stateWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.stateUpdateToOneWithWhereWithoutEventsInput, Prisma.stateUpdateWithoutEventsInput>, Prisma.stateUncheckedUpdateWithoutEventsInput>;
};
export type stateCreateWithoutCountryInput = {
    name: string;
    createdAt?: Date | string;
    events?: Prisma.EventCreateNestedManyWithoutStateInput;
};
export type stateUncheckedCreateWithoutCountryInput = {
    id?: number;
    name: string;
    createdAt?: Date | string;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutStateInput;
};
export type stateCreateOrConnectWithoutCountryInput = {
    where: Prisma.stateWhereUniqueInput;
    create: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput>;
};
export type stateCreateManyCountryInputEnvelope = {
    data: Prisma.stateCreateManyCountryInput | Prisma.stateCreateManyCountryInput[];
    skipDuplicates?: boolean;
};
export type stateUpsertWithWhereUniqueWithoutCountryInput = {
    where: Prisma.stateWhereUniqueInput;
    update: Prisma.XOR<Prisma.stateUpdateWithoutCountryInput, Prisma.stateUncheckedUpdateWithoutCountryInput>;
    create: Prisma.XOR<Prisma.stateCreateWithoutCountryInput, Prisma.stateUncheckedCreateWithoutCountryInput>;
};
export type stateUpdateWithWhereUniqueWithoutCountryInput = {
    where: Prisma.stateWhereUniqueInput;
    data: Prisma.XOR<Prisma.stateUpdateWithoutCountryInput, Prisma.stateUncheckedUpdateWithoutCountryInput>;
};
export type stateUpdateManyWithWhereWithoutCountryInput = {
    where: Prisma.stateScalarWhereInput;
    data: Prisma.XOR<Prisma.stateUpdateManyMutationInput, Prisma.stateUncheckedUpdateManyWithoutCountryInput>;
};
export type stateScalarWhereInput = {
    AND?: Prisma.stateScalarWhereInput | Prisma.stateScalarWhereInput[];
    OR?: Prisma.stateScalarWhereInput[];
    NOT?: Prisma.stateScalarWhereInput | Prisma.stateScalarWhereInput[];
    id?: Prisma.IntFilter<"state"> | number;
    name?: Prisma.StringFilter<"state"> | string;
    countryId?: Prisma.IntFilter<"state"> | number;
    createdAt?: Prisma.DateTimeFilter<"state"> | Date | string;
};
export type stateCreateWithoutEventsInput = {
    name: string;
    createdAt?: Date | string;
    country: Prisma.countryCreateNestedOneWithoutStatesInput;
};
export type stateUncheckedCreateWithoutEventsInput = {
    id?: number;
    name: string;
    countryId: number;
    createdAt?: Date | string;
};
export type stateCreateOrConnectWithoutEventsInput = {
    where: Prisma.stateWhereUniqueInput;
    create: Prisma.XOR<Prisma.stateCreateWithoutEventsInput, Prisma.stateUncheckedCreateWithoutEventsInput>;
};
export type stateUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.stateUpdateWithoutEventsInput, Prisma.stateUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.stateCreateWithoutEventsInput, Prisma.stateUncheckedCreateWithoutEventsInput>;
    where?: Prisma.stateWhereInput;
};
export type stateUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.stateWhereInput;
    data: Prisma.XOR<Prisma.stateUpdateWithoutEventsInput, Prisma.stateUncheckedUpdateWithoutEventsInput>;
};
export type stateUpdateWithoutEventsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    country?: Prisma.countryUpdateOneRequiredWithoutStatesNestedInput;
};
export type stateUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    countryId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type stateCreateManyCountryInput = {
    id?: number;
    name: string;
    createdAt?: Date | string;
};
export type stateUpdateWithoutCountryInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.EventUpdateManyWithoutStateNestedInput;
};
export type stateUncheckedUpdateWithoutCountryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    events?: Prisma.EventUncheckedUpdateManyWithoutStateNestedInput;
};
export type stateUncheckedUpdateManyWithoutCountryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type StateCountOutputType
 */
export type StateCountOutputType = {
    events: number;
};
export type StateCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    events?: boolean | StateCountOutputTypeCountEventsArgs;
};
/**
 * StateCountOutputType without action
 */
export type StateCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StateCountOutputType
     */
    select?: Prisma.StateCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StateCountOutputType without action
 */
export type StateCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
export type stateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
    createdAt?: boolean;
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
    events?: boolean | Prisma.state$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.StateCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["state"]>;
export type stateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
    createdAt?: boolean;
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["state"]>;
export type stateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
    createdAt?: boolean;
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["state"]>;
export type stateSelectScalar = {
    id?: boolean;
    name?: boolean;
    countryId?: boolean;
    createdAt?: boolean;
};
export type stateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "countryId" | "createdAt", ExtArgs["result"]["state"]>;
export type stateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
    events?: boolean | Prisma.state$eventsArgs<ExtArgs>;
    _count?: boolean | Prisma.StateCountOutputTypeDefaultArgs<ExtArgs>;
};
export type stateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
};
export type stateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    country?: boolean | Prisma.countryDefaultArgs<ExtArgs>;
};
export type $statePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "state";
    objects: {
        country: Prisma.$countryPayload<ExtArgs>;
        events: Prisma.$EventPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        countryId: number;
        createdAt: Date;
    }, ExtArgs["result"]["state"]>;
    composites: {};
};
export type stateGetPayload<S extends boolean | null | undefined | stateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$statePayload, S>;
export type stateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<stateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StateCountAggregateInputType | true;
};
export interface stateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['state'];
        meta: {
            name: 'state';
        };
    };
    /**
     * Find zero or one State that matches the filter.
     * @param {stateFindUniqueArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends stateFindUniqueArgs>(args: Prisma.SelectSubset<T, stateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one State that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {stateFindUniqueOrThrowArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends stateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, stateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first State that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindFirstArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends stateFindFirstArgs>(args?: Prisma.SelectSubset<T, stateFindFirstArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first State that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindFirstOrThrowArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends stateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, stateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more States that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all States
     * const states = await prisma.state.findMany()
     *
     * // Get first 10 States
     * const states = await prisma.state.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const stateWithIdOnly = await prisma.state.findMany({ select: { id: true } })
     *
     */
    findMany<T extends stateFindManyArgs>(args?: Prisma.SelectSubset<T, stateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a State.
     * @param {stateCreateArgs} args - Arguments to create a State.
     * @example
     * // Create one State
     * const State = await prisma.state.create({
     *   data: {
     *     // ... data to create a State
     *   }
     * })
     *
     */
    create<T extends stateCreateArgs>(args: Prisma.SelectSubset<T, stateCreateArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many States.
     * @param {stateCreateManyArgs} args - Arguments to create many States.
     * @example
     * // Create many States
     * const state = await prisma.state.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends stateCreateManyArgs>(args?: Prisma.SelectSubset<T, stateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many States and returns the data saved in the database.
     * @param {stateCreateManyAndReturnArgs} args - Arguments to create many States.
     * @example
     * // Create many States
     * const state = await prisma.state.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many States and only return the `id`
     * const stateWithIdOnly = await prisma.state.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends stateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, stateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a State.
     * @param {stateDeleteArgs} args - Arguments to delete one State.
     * @example
     * // Delete one State
     * const State = await prisma.state.delete({
     *   where: {
     *     // ... filter to delete one State
     *   }
     * })
     *
     */
    delete<T extends stateDeleteArgs>(args: Prisma.SelectSubset<T, stateDeleteArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one State.
     * @param {stateUpdateArgs} args - Arguments to update one State.
     * @example
     * // Update one State
     * const state = await prisma.state.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends stateUpdateArgs>(args: Prisma.SelectSubset<T, stateUpdateArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more States.
     * @param {stateDeleteManyArgs} args - Arguments to filter States to delete.
     * @example
     * // Delete a few States
     * const { count } = await prisma.state.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends stateDeleteManyArgs>(args?: Prisma.SelectSubset<T, stateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many States
     * const state = await prisma.state.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends stateUpdateManyArgs>(args: Prisma.SelectSubset<T, stateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more States and returns the data updated in the database.
     * @param {stateUpdateManyAndReturnArgs} args - Arguments to update many States.
     * @example
     * // Update many States
     * const state = await prisma.state.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more States and only return the `id`
     * const stateWithIdOnly = await prisma.state.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends stateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, stateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one State.
     * @param {stateUpsertArgs} args - Arguments to update or create a State.
     * @example
     * // Update or create a State
     * const state = await prisma.state.upsert({
     *   create: {
     *     // ... data to create a State
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the State we want to update
     *   }
     * })
     */
    upsert<T extends stateUpsertArgs>(args: Prisma.SelectSubset<T, stateUpsertArgs<ExtArgs>>): Prisma.Prisma__stateClient<runtime.Types.Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateCountArgs} args - Arguments to filter States to count.
     * @example
     * // Count the number of States
     * const count = await prisma.state.count({
     *   where: {
     *     // ... the filter for the States we want to count
     *   }
     * })
    **/
    count<T extends stateCountArgs>(args?: Prisma.Subset<T, stateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StateCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StateAggregateArgs>(args: Prisma.Subset<T, StateAggregateArgs>): Prisma.PrismaPromise<GetStateAggregateType<T>>;
    /**
     * Group by State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends stateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: stateGroupByArgs['orderBy'];
    } : {
        orderBy?: stateGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, stateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the state model
     */
    readonly fields: stateFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for state.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__stateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    country<T extends Prisma.countryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.countryDefaultArgs<ExtArgs>>): Prisma.Prisma__countryClient<runtime.Types.Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    events<T extends Prisma.state$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.state$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the state model
 */
export interface stateFieldRefs {
    readonly id: Prisma.FieldRef<"state", 'Int'>;
    readonly name: Prisma.FieldRef<"state", 'String'>;
    readonly countryId: Prisma.FieldRef<"state", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"state", 'DateTime'>;
}
/**
 * state findUnique
 */
export type stateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter, which state to fetch.
     */
    where: Prisma.stateWhereUniqueInput;
};
/**
 * state findUniqueOrThrow
 */
export type stateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter, which state to fetch.
     */
    where: Prisma.stateWhereUniqueInput;
};
/**
 * state findFirst
 */
export type stateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter, which state to fetch.
     */
    where?: Prisma.stateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of states to fetch.
     */
    orderBy?: Prisma.stateOrderByWithRelationInput | Prisma.stateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for states.
     */
    cursor?: Prisma.stateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` states from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` states.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of states.
     */
    distinct?: Prisma.StateScalarFieldEnum | Prisma.StateScalarFieldEnum[];
};
/**
 * state findFirstOrThrow
 */
export type stateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter, which state to fetch.
     */
    where?: Prisma.stateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of states to fetch.
     */
    orderBy?: Prisma.stateOrderByWithRelationInput | Prisma.stateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for states.
     */
    cursor?: Prisma.stateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` states from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` states.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of states.
     */
    distinct?: Prisma.StateScalarFieldEnum | Prisma.StateScalarFieldEnum[];
};
/**
 * state findMany
 */
export type stateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter, which states to fetch.
     */
    where?: Prisma.stateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of states to fetch.
     */
    orderBy?: Prisma.stateOrderByWithRelationInput | Prisma.stateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing states.
     */
    cursor?: Prisma.stateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` states from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` states.
     */
    skip?: number;
    distinct?: Prisma.StateScalarFieldEnum | Prisma.StateScalarFieldEnum[];
};
/**
 * state create
 */
export type stateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * The data needed to create a state.
     */
    data: Prisma.XOR<Prisma.stateCreateInput, Prisma.stateUncheckedCreateInput>;
};
/**
 * state createMany
 */
export type stateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many states.
     */
    data: Prisma.stateCreateManyInput | Prisma.stateCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * state createManyAndReturn
 */
export type stateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * The data used to create many states.
     */
    data: Prisma.stateCreateManyInput | Prisma.stateCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * state update
 */
export type stateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * The data needed to update a state.
     */
    data: Prisma.XOR<Prisma.stateUpdateInput, Prisma.stateUncheckedUpdateInput>;
    /**
     * Choose, which state to update.
     */
    where: Prisma.stateWhereUniqueInput;
};
/**
 * state updateMany
 */
export type stateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update states.
     */
    data: Prisma.XOR<Prisma.stateUpdateManyMutationInput, Prisma.stateUncheckedUpdateManyInput>;
    /**
     * Filter which states to update
     */
    where?: Prisma.stateWhereInput;
    /**
     * Limit how many states to update.
     */
    limit?: number;
};
/**
 * state updateManyAndReturn
 */
export type stateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * The data used to update states.
     */
    data: Prisma.XOR<Prisma.stateUpdateManyMutationInput, Prisma.stateUncheckedUpdateManyInput>;
    /**
     * Filter which states to update
     */
    where?: Prisma.stateWhereInput;
    /**
     * Limit how many states to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * state upsert
 */
export type stateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * The filter to search for the state to update in case it exists.
     */
    where: Prisma.stateWhereUniqueInput;
    /**
     * In case the state found by the `where` argument doesn't exist, create a new state with this data.
     */
    create: Prisma.XOR<Prisma.stateCreateInput, Prisma.stateUncheckedCreateInput>;
    /**
     * In case the state was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.stateUpdateInput, Prisma.stateUncheckedUpdateInput>;
};
/**
 * state delete
 */
export type stateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
    /**
     * Filter which state to delete.
     */
    where: Prisma.stateWhereUniqueInput;
};
/**
 * state deleteMany
 */
export type stateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which states to delete
     */
    where?: Prisma.stateWhereInput;
    /**
     * Limit how many states to delete.
     */
    limit?: number;
};
/**
 * state.events
 */
export type state$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * state without action
 */
export type stateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: Prisma.stateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the state
     */
    omit?: Prisma.stateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.stateInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=state.d.ts.map