import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerEMERGENCY = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMERGENCY, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly is_emergency?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEMERGENCY = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EMERGENCY, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly is_emergency?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EMERGENCY = LazyLoading extends LazyLoadingDisabled ? EagerEMERGENCY : LazyEMERGENCY

export declare const EMERGENCY: (new (init: ModelInit<EMERGENCY>) => EMERGENCY) & {
  copyOf(source: EMERGENCY, mutator: (draft: MutableModel<EMERGENCY>) => MutableModel<EMERGENCY> | void): EMERGENCY;
}

type EagerTEST = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TEST, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly member_id: string;
  readonly index: number;
  readonly calender: string;
  readonly time_point?: string | null;
  readonly occurence?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTEST = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TEST, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly member_id: string;
  readonly index: number;
  readonly calender: string;
  readonly time_point?: string | null;
  readonly occurence?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TEST = LazyLoading extends LazyLoadingDisabled ? EagerTEST : LazyTEST

export declare const TEST: (new (init: ModelInit<TEST>) => TEST) & {
  copyOf(source: TEST, mutator: (draft: MutableModel<TEST>) => MutableModel<TEST> | void): TEST;
}

type EagerMEMBER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MEMBER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly sex: string;
  readonly age: string;
  readonly feature?: string | null;
  readonly number?: string | null;
  readonly current?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMEMBER = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MEMBER, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly sex: string;
  readonly age: string;
  readonly feature?: string | null;
  readonly number?: string | null;
  readonly current?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MEMBER = LazyLoading extends LazyLoadingDisabled ? EagerMEMBER : LazyMEMBER

export declare const MEMBER: (new (init: ModelInit<MEMBER>) => MEMBER) & {
  copyOf(source: MEMBER, mutator: (draft: MutableModel<MEMBER>) => MutableModel<MEMBER> | void): MEMBER;
}