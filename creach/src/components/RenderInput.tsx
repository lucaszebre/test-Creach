import React from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

const RenderInputComponent = (inputType:string, field:any, possibilities:any) => {
  switch (inputType) {
    case 'textarea':
      return <Textarea value={""} {...field} />;
    case 'number':
      return <Input type="number" {...field} />;
    case 'radio':
      return (
        <RadioGroup                   onValueChange={field.onChange}
        className='flex flex-row justify-between' {...field}>
          {possibilities?.map((p:string, index:number) => (
            <div key={index}  className="flex items-center space-x-2">
            <RadioGroupItem  value={p}>{p}</RadioGroupItem>
            <Label htmlFor={p}>{p}</Label>
          </div>
          ))}
        </RadioGroup>
      );
    case 'select':
      return (
        <Select onValueChange={field.onChange} {...field}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={possibilities[0]} />
          </SelectTrigger>
          <SelectContent>
            {possibilities?.map((option:any) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case 'rating':
      return <Input type="number" {...field} />;
    default:
      return null;
  }
};

export default RenderInputComponent;
