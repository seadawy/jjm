<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cars extends Model
{
    use HasFactory;
    protected $table = 'cars';
    protected $fillable = [
        'model',
        'price',
        'brand_id',
        'imgArray',
    ];

    /**
     * The brand that the car belongs to.
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
