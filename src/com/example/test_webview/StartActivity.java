package com.example.test_webview;
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

public class StartActivity extends Activity implements OnTouchListener{
	
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
	  
	    
	   /* 
	    @JavascriptInterface
	    public String rep3(){
	    	String res = "";
	    	ContentResolver cr = getContentResolver();
	        Cursor cur = cr.query(ContactsContract.Contacts.CONTENT_URI,
	                null, null, null, null);
	        if (cur.getCount() > 0) {
			    while (cur.moveToNext()) {
				        String id = cur.getString(cur.getColumnIndex(ContactsContract.Contacts._ID));
					String name = cur.getString(cur.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
					res = res + name;
			 		if (Integer.parseInt(cur.getString(cur.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER))) > 0) {
			 			 Cursor pCur = cr.query(
			 		 		    ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.CONTACT_ID +" = ?", new String[]{id}, null);
			 		 	        while (pCur.moveToNext()) {
			 		 		    String phone = pCur.getString( pCur.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
			 		 		    res = res +"BALISEENDL"+ "    "+phone;
			 		 	        } 
			 		 	        pCur.close();
			 	    }
			 		//if (Integer.parseInt(cur.getString(cur.getColumnIndex(ContactsContract.CommonDataKinds.Email.ADDRESS))) > 0) {
			 			 //Cursor pCur = cr.query(
			 		 		    //ContactsContract.CommonDataKinds.Email.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.CONTACT_ID +" = ?", new String[]{id}, null);
			 		 	        //while (pCur.moveToNext()) {
			 		 		    //String email = pCur.getString( pCur.getColumnIndex(ContactsContract.CommonDataKinds.Email.ADDRESS));
			 		 		    //res = res +"BALISEENDL"+ "    "+email;
			 		 	        //} 
			 		 	        //pCur.close();
			 	    //}
			 		//String email = cur.getString(cur.getColumnIndex(ContactsContract.CommonDataKinds.Email.ADDRESS));
			 		res = res + "BALISEENDLBALISEENDL";
		           }
	        }
	    	Log.d("bla", res);
	    	return res;
	    }
	    
	    @JavascriptInterface
	    public String rep2(){
	    	ArrayList<String> emlRecs = new ArrayList<String>();
	        HashSet<String> emlRecsHS = new HashSet<String>();
	        ContentResolver cr = getContentResolver();
	        String[] PROJECTION = new String[] { ContactsContract.RawContacts._ID, 
	                ContactsContract.Contacts.DISPLAY_NAME,
	                ContactsContract.Contacts.PHOTO_ID,
	                ContactsContract.CommonDataKinds.Phone.NUMBER, 
	                ContactsContract.CommonDataKinds.Photo.CONTACT_ID,
	                ContactsContract.CommonDataKinds.Email.ADDRESS
	                };
	        //String order = "CASE WHEN " 
	        //       + ContactsContract.Contacts.DISPLAY_NAME 
	                //+ " NOT LIKE '%@%' THEN 1 ELSE 2 END, " 
	        //        + ContactsContract.Contacts.DISPLAY_NAME 
	                //+ ", " 
	        //        + ContactsContract.CommonDataKinds.Email.DISPLAY_NAME
	        //        + " COLLATE NOCASE";
	        String filter = ContactsContract.CommonDataKinds.Email.DATA + " NOT LIKE ''";
	        Cursor cur = cr.query(ContactsContract.Contacts.CONTENT_URI, PROJECTION, null, null, null);
	        if (cur.moveToFirst()) {
	            do {
	                // names comes in hand sometimes
	               // if(cur.getString(1)!=null){
		            	String a = cur.getString(0);
		                String b = cur.getString(1);
		                String c = cur.getString(2);
		                String d = cur.getString(3);
		                String e = cur.getString(4);
		                String f = cur.getString(5);
		                // keep unique only
		                if (a != null) {
		                    emlRecs.add(a+" "+b+" "+c+" "+d+" "+e+" "+f+"  OK"+"BALISEENDL");
		                }
	                //}
	            } while (cur.moveToNext());
	        }

	        cur.close();
	        String res = "";
	        int s = emlRecs.size();
	        for(int j = 0; j<s;j++){
	        	res = res + emlRecs.get(j);
	        }
	        return res;
	    }*/
	}

	@Override
	public boolean onTouch(View arg0, MotionEvent arg1) {
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
		
		return false;
	}
}
