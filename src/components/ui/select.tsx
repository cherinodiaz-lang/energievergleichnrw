import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import NativeSelect from '@/components/ui/native-select';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  children: ReactNode;
}

interface SelectTriggerProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

interface SelectContentProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return '';
}

export function Select({ value, onValueChange, required = false, children }: SelectProps) {
  let id = '';
  let className = '';
  let placeholder: string | undefined;
  const options: Array<{ label: string; value: string }> = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === SelectTrigger) {
      const trigger = child as ReactElement<SelectTriggerProps>;
      id = trigger.props.id ?? id;
      className = trigger.props.className ?? className;

      Children.forEach(trigger.props.children, (triggerChild) => {
        if (!isValidElement(triggerChild) || triggerChild.type !== SelectValue) {
          return;
        }

        const valueChild = triggerChild as ReactElement<SelectValueProps>;
        placeholder = valueChild.props.placeholder;
      });
    }

    if (child.type === SelectContent) {
      const content = child as ReactElement<SelectContentProps>;

      Children.forEach(content.props.children, (contentChild) => {
        if (!isValidElement(contentChild) || contentChild.type !== SelectItem) {
          return;
        }

        const item = contentChild as ReactElement<SelectItemProps>;
        options.push({
          value: item.props.value,
          label: getTextContent(item.props.children),
        });
      });
    }
  });

  return (
    <NativeSelect
      id={id}
      value={value}
      onValueChange={onValueChange}
      options={options}
      placeholder={placeholder}
      required={required}
      className={className}
    />
  );
}

export function SelectTrigger(_: SelectTriggerProps) {
  return null;
}

export function SelectContent(_: SelectContentProps) {
  return null;
}

export function SelectItem(_: SelectItemProps) {
  return null;
}

export function SelectValue(_: SelectValueProps) {
  return null;
}
