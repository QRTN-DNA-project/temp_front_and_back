import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MEMBER = LazyLoading extends LazyLoadingDisabled ? EagerMEMBER : LazyMEMBER

export declare const MEMBER: (new (init: ModelInit<MEMBER>) => MEMBER) & {
  copyOf(source: MEMBER, mutator: (draft: MutableModel<MEMBER>) => MutableModel<MEMBER> | void): MEMBER;
}