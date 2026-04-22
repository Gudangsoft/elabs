<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        \Illuminate\Support\Facades\DB::table('lab_parameters')->insert([
            [
                'parameter_code' => 'systolic',
                'parameter_name' => 'Tekanan Darah Sistolik',
                'category' => 'Tekanan Darah',
                'unit' => 'mmHg',
                'normal_min' => 90,
                'normal_max' => 120,
                'normal_range_text' => '90-120',
                'gender' => 'all',
                'description' => 'Tekanan darah saat jantung berdetak (Sistolik)',
                'sort_order' => 9
            ],
            [
                'parameter_code' => 'diastolic',
                'parameter_name' => 'Tekanan Darah Diastolik',
                'category' => 'Tekanan Darah',
                'unit' => 'mmHg',
                'normal_min' => 60,
                'normal_max' => 80,
                'normal_range_text' => '60-80',
                'gender' => 'all',
                'description' => 'Tekanan darah saat jantung beristirahat (Diastolik)',
                'sort_order' => 10
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \Illuminate\Support\Facades\DB::table('lab_parameters')->whereIn('parameter_code', ['systolic', 'diastolic'])->delete();
    }
};
