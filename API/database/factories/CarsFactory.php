<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Cars;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cars>
 */
class CarsFactory extends Factory
{
    protected $model = Cars::class;
    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        $brandId = Brand::inRandomOrder()->first()->id;

        return [
            'model' => $this->faker->word,
            'price' => $this->faker->numberBetween(10000, 50000),
            'brand_id' => $brandId,
            'imgArray' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
