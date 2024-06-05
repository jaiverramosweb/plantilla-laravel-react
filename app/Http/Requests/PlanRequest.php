<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'datacenters'           => ['nullable'],
            'plan'                  => ['required'],
            'tecnology'             => ['required'],
            'name'                  => ['required'],
            'code'                  => ['required'],
            'vcpu'                  => ['required'],
            'memory'                => ['required'],
            'storage'               => ['required'],
            'transfer'              => ['required'],
            'price'                 => ['required'],
            'backup_day'            => ['required'],
            'backup_week'           => ['required'],
            'backing_abjustment'    => ['required'],
        ];
    }
}
