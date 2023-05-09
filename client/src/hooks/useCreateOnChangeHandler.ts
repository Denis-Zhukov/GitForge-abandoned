import {ChangeEvent, useCallback} from "react";

export const useCreateOnChangeHandler = <T extends string>(setValue: (value: T) => void) => {
    return useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as T);
    }, [setValue]);
};