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

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
