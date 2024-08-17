<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Orders extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_email',
        'paypal_transaction_id',
        'product',
        'status',
    ];

    public function carDetails(): BelongsTo
    {
        return $this->belongsTo(Cars::class, 'product');
    }

    public function downloadLink(): BelongsTo
    {
        return $this->belongsTo(Downloads::class, 'product', 'car_id');
    }
}
