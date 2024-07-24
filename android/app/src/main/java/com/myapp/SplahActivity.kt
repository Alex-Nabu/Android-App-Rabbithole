package com.myapp

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.myapp.MainActivity

class SplashActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val imageView = ImageView(this)
        Glide.with(this).load(R.drawable.splash_image).into(imageView)
        setContentView(imageView)

        // Delay for splash screen (e.g., 3 seconds)
        Handler().postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }, 3000) // Adjust the delay as needed
    }
}
