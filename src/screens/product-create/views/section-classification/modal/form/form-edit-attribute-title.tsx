import { HStack, View } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { createRef, FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm, UseFormGetValues } from 'react-hook-form';
import { TextInput } from 'react-native';
import { FormControlInputSave } from 'src/components';
import { FormParams } from 'src/types';
import * as Yup from 'yup';

export const FormEditAttributeTitle: FC<{
  value: string;
  setValue: (e: string | null) => void;
  currentAttributeIndex: number;
  getValues: UseFormGetValues<FormParams.CreateProductClassification>;
}> = ({ value, setValue, currentAttributeIndex, getValues }) => {
  const ref = createRef<TextInput>();

  const {
    control: controlAttribute,
    setError,
    handleSubmit: handleSubmitSpecification,
    setValue: setValueSpecification,
    handleSubmit,
  } = useForm<{ title: string }>({
    defaultValues: {
      title: value,
    },
    resolver: yupResolver(
      Yup.object({
        title: Yup.string().min(1, 'Thông tin bắt buộc').required('Thông tin bắt buộc'),
      }),
    ),
  });

  const onSubmit: SubmitHandler<{ title: string }> = async values => {
    const specificationTitle = values.title;
    const { attributes } = getValues();
    if (
      attributes.find((e, index) => {
        return currentAttributeIndex !== index && e.title === specificationTitle;
      })
    ) {
      setError('title', { type: 'custom', message: 'Phân loại đã tồn tại trong nhóm' });
      return;
    }
    setValue(values.title);
    setValueSpecification('title', '');
  };

  useEffect(() => {
    if (ref) {
      ref.current?.focus();
    }
  }, [ref]);

  return (
    <>
      <HStack gap={16}>
        <View flexGrow={1}>
          <Controller
            control={controlAttribute}
            name="title"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
              return (
                <FormControlInputSave
                  value={value}
                  onChange={onChange}
                  defaultValue={value}
                  onBlur={onBlur}
                  onSubmit={handleSubmit(onSubmit)}
                  error={error?.message}
                  ref={ref}
                />
              );
            }}
          ></Controller>
        </View>
      </HStack>
    </>
  );
};
