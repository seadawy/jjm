<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     * @return array<string, mixed>
     */
    protected $model = Brand::class;
    public function definition(): array
    {
        return [
            'brand' => $this->faker->company,
            'brand_img' => $this->faker->imageUrl(640, 480, 'business', true),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
