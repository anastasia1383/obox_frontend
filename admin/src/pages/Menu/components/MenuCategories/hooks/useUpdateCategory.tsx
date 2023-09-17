import { useDialog } from '@shared/providers/DialogProvider/useDialog';
import { useCategoryFormValidation } from '../validation/useCategoryFormValidation';
import { useTranslation } from '@libs/react-i18next';
import {
  CategoriesService,
  Category,
  UpdateCategoryRequest,
} from '@shared/services';
import { useRequest } from '@admin/hooks';
import { useRef } from 'react';
import { Form, FormRef } from '@shared/components/atoms/Form';
import { Dialog } from '@shared/components/molecules/Dialog';
import { FormInput } from '@shared/components/atoms/FormInput';
import { InputVariants } from '@shared/components/atoms/Input';

interface UpdateCategoryParams {
  onSuccess: () => Promise<void>;
}

export const useUpdateCategory = (args: UpdateCategoryParams) => {
  const { t } = useTranslation();
  const { validationSchema } = useCategoryFormValidation();
  const { openDialog } = useDialog();
  const { onSuccess } = args;

  const updateSubmit = async ({ category_id, name }: Category) => {
    const id = category_id;
    const request: UpdateCategoryRequest = {
      name,
    };
    return CategoriesService.update(id, request);
  };

  const { execute: onUpdateSubmit } = useRequest({
    requestFunction: updateSubmit,
    onSuccess,
  });

  const openCategoryUpdateDialog = (category: Category) =>
    openDialog(({ closeDialog }) => {
      const formRef = useRef<FormRef<Partial<Category>> | null>(null);

      const defaultValues: Category = {
        ...category,
      };

      return (
        <Dialog
          okCallback={() => {
            if (formRef.current) {
              formRef.current.submit();
            }
          }}
          cancelCallback={() => {
            closeDialog();
          }}
          title={t('menu:updateCategoryForm.title')}
          size="lg"
          okText={t('common:buttons:confirm')}
          cancelText={t('common:buttons:cancel')}
        >
          <Form
            ref={formRef}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (data) => {
              await onUpdateSubmit(data as Category);
            }}
          >
            <>
              <FormInput type={InputVariants.HIDDEN} name="category_id" />
              <FormInput
                placeholder={t('menu:updateCategoryForm.placeholder')}
                type={InputVariants.TEXT}
                name="name"
              />
            </>
          </Form>
        </Dialog>
      );
    });
  return { openCategoryUpdateDialog };
};