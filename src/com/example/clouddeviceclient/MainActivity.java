package com.example.clouddeviceclient;
import java.io.Console;
import java.util.ArrayList;
import java.util.HashSet;

import com.example.test_webview.util.SystemUiHider;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.ContactsContract;
import android.provider.ContactsContract.PhoneLookup;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.DragEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnDragListener;
import android.view.View.OnTouchListener;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;


/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */

public class MainActivity extends Activity implements OnTouchListener{
	
	public static final int PICK_IMAGE = 1;
	int count = 0;
	WebView myWebView;
	DisplayMetrics displaymetrics;
	
	
	 public void onBackPressed (){

        if (myWebView.isFocused() && myWebView.canGoBack()) {
        	myWebView.goBack();       
        }
        else{
        	finish();
        }
	   }
	@SuppressLint("SetJavaScriptEnabled")
	
	protected void onCreate(Bundle savedInstanceState) {
		displaymetrics = new DisplayMetrics();
		Log.d("Start","OK");
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_start);
		myWebView = (WebView) findViewById(R.id.webview);
		myWebView.setOnTouchListener(this);
		myWebView.setWebChromeClient(new HelloWebViewClient());
		myWebView.getSettings().setJavaScriptEnabled(true);
		myWebView.addJavascriptInterface(new WebAppInterface(), "JSInterface");
		myWebView.loadUrl("file:///android_asset/WebPages/menu.html");
		
	}

	private class HelloWebViewClient extends WebChromeClient {
	    
		public boolean onConsoleMessage(ConsoleMessage cm) {
		    Log.d("MyApplication", cm.message() + " -- From line "
		                         + cm.lineNumber() + " of "
		                         + cm.sourceId() );
		    return true;    
		}
	
	}
	
	public class WebAppInterface {

	    WebAppInterface() {
	    }
	    @JavascriptInterface
	    public String addadd() {
	        Log.d("ok","ok");
	        count++;
	        return ""+count;
	    }
	    @JavascriptInterface
	    public String get(){
	    	return ""+count; 
	    }
	 
	    @JavascriptInterface
	    public String img()
	    {
	    	
	    	Log.d("ok","ok");
	    	Intent intent = new Intent();
		    intent.setType("image/*");
		    intent.setAction(Intent.ACTION_GET_CONTENT);
		    startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE);
		    
		    return "";
	    }
	    
	    @JavascriptInterface
	    public String sendEmail(String to, String topic,String content)
	    {
	    	
	    	Intent i = new Intent(Intent.ACTION_SEND);
	    	i.setType("message/rfc822");
	    	i.putExtra(Intent.EXTRA_EMAIL  , new String[]{to});
	    	i.putExtra(Intent.EXTRA_SUBJECT, topic);
	    	i.putExtra(Intent.EXTRA_TEXT   , content);
	    	try {
	    	    startActivity(Intent.createChooser(i, "Send mail..."));
	    	} catch (android.content.ActivityNotFoundException ex) {
	    	    return "NO_CLIENT";
	    	}
	    	
		    return "OK";
	    }
		   
	    @JavascriptInterface
	    public String rep()
	    {
	
	    	String res = "{\"contacts\":[";
	    	Cursor cursor = getContentResolver().query(ContactsContract.Contacts.CONTENT_URI,null, null, null, null); 
		    boolean f = true;
	    	while (cursor.moveToNext()) { 
	    		if(f == true){
			 			f = false;
			 		}else{
			 			res = res+",";
			 		}
	    		String contactId = cursor.getString(cursor.getColumnIndex( 
		       ContactsContract.Contacts._ID)); 
		       String contactName = cursor.getString(cursor.getColumnIndex( 
		       ContactsContract.Contacts.DISPLAY_NAME)); 
		       String group = cursor.getString(cursor.getColumnIndex( 
			   ContactsContract.Contacts.IN_VISIBLE_GROUP)); 
		       res = res + "{\"Name\":\""+contactName+"\",\"Visible\":\""+group+"\",\"Number\":[";
		       if (Integer.parseInt(cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER))) > 0) {
		 			Cursor pCur = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.CONTACT_ID +" = ?", new String[]{contactId}, null);    
 			 		boolean first = true;
 			 		while (pCur.moveToNext()) {
	 			 		if(first == true){
	 			 			
	 			 			first = false;
	 			 		}else{
	 			 			res = res+",";
	 			 		}
	 		 		    String phone = pCur.getString( pCur.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
	 		 		    res = res +"\""+phone+"\"";
 		 	        } 
 		 	        pCur.close();
		 	    }
		       res = res +"],\"Email\":[";
		       Cursor emails = getContentResolver().query(ContactsContract.CommonDataKinds.Email.CONTENT_URI, null, ContactsContract.CommonDataKinds.Email.CONTACT_ID + " = " + contactId, null, null); 
		       boolean first = true;
		       while (emails.moveToNext()) { 
		    	   if(first == true){
			 			first = false;
			 		}else{
			 			res = res+",";
			 		}
		    
		    	   
		    	   // This would allow you get several email addresses 
		          String emailAddress = emails.getString( 
		          emails.getColumnIndex(ContactsContract.CommonDataKinds.Email.DATA)); 
		          res = res +"\""+emailAddress+"\"";
		       } 
		       
		       
		       emails.close();
		       res = res +"]}";
		    }
		    cursor.close(); 
		    res = res +"]}";
		    return res;
	    }
	  
	}      

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	    if(requestCode == PICK_IMAGE && data != null && data.getData() != null) {
	        Uri _uri = data.getData();

	        //User had pick an image.
	        Cursor cursor = getContentResolver().query(_uri, new String[] { android.provider.MediaStore.Images.ImageColumns.DATA }, null, null, null);
	        cursor.moveToFirst();
	        
	        //Link to the image
	        final String imageFilePath = cursor.getString(0);	       
	        Log.d("bla","bla");
	        myWebView.loadUrl("javascript:(function() { " +  
	                "imgok(\""+imageFilePath+"\")"+  
	                "})()");  
	  
	        cursor.close();
	    }
	    
	    super.onActivityResult(requestCode, resultCode, data);
	}

	@Override
	public boolean onTouch(View arg0, MotionEvent arg1) {
		/*
		//float x = arg1.getX()/displaymetrics.widthPixels;
		//float y = arg1.getY()/displaymetrics.heightPixels;
		float x = arg1.getX();
		float y = arg1.getY();
		
		if (arg1.getAction() == android.view.MotionEvent.ACTION_DOWN) {
			myWebView.loadUrl("javascript:(function() { " +  
	                "touchDown(" + x + ","+y+")"+  
	                "})()");  
		} else if (arg1.getAction() == android.view.MotionEvent.ACTION_UP) {
			myWebView.loadUrl("javascript:(function() { " +  
	                "touchUp(" + x + ","+y+")"+  
	                "})()");  
		} else if (arg1.getAction() == android.view.MotionEvent.ACTION_MOVE) {
			myWebView.loadUrl("javascript:(function() { " +  
	                "touchMove(" + x + ","+y+")"+  
	                "})()");  
		}
		*/
		return false;
	}
}
