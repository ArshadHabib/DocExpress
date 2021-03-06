package com.example.docexpress;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class MyDbHelper extends SQLiteOpenHelper {
    String create_user_table="CREATE TABLE users(user_id TEXT PRIMARY KEY,user_name TEXT,user_job TEXT)";
    String create_doc_ongoing="CREATE TABLE doc_ongoing(doc_id TEXT PRIMARY KEY,doc_name TEXT,start_date TEXT,end_date TEXT,app_id TEXT,app_name TEXT)";
    String create_doc_summary_table="CREATE TABLE doc_summary(table_id TEXT PRIMARY KEY,total TEXT,completed TEXT, ongoing TEXT,returned TEXT,rejected TEXT)";
    String delete_user_table="DROP TABLE IF EXISTS users";
    String create_doc_track_table="CREATE TABLE doctrack(step TEXT PRIMARY KEY, rec_date TEXT, emp_id TEXT,comments TEXT)";
    String create_doc_names_table="CREATE TABLE docnames(name TEXT PRIMARY KEY)";
    String create_doc_inserted_table="CREATE TABLE docinserted(doc_id TEXT PRIMARY KEY, doc_name TEXT, doc_start_date TEXT,doc_due_date TEXT,doc_attachment TEXT, doc_status TEXT, emp_id TEXT, app_id TEXT, emp_name TEXT, dept_name TEXT, app_name TEXT)";
    String create_doc_route_table="CREATE TABLE docroute(doc_step_no TEXT PRIMARY KEY, doc_name TEXT, emp_id TEXT,emp_name TEXT, emp_rank TEXT, dept_name TEXT)";
    String create_doc_route_customized_table="CREATE TABLE docroutecustomized(doc_step_no TEXT PRIMARY KEY, doc_name TEXT, emp_id TEXT,emp_name TEXT, emp_rank TEXT, dept_name TEXT)";
    String create_doc_received_table="CREATE TABLE docreceived(doc_id TEXT PRIMARY KEY, doc_name TEXT, doc_start_date TEXT,doc_due_date TEXT,doc_attachment TEXT, doc_status TEXT, app_id TEXT, app_name TEXT, starting_emp_id TEXT, starting_emp_name TEXT, starting_emp_rank TEXT, starting_dept_id TEXT, starting_dept_name TEXT, sender_emp_id TEXT, sender_emp_name TEXT, sender_emp_rank TEXT, sender_dept_id TEXT, sender_dept_name TEXT, sender_note TEXT)";
    public MyDbHelper(@Nullable Context context) {
        super(context, "docexpress.db", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(create_user_table);

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

        db.execSQL(delete_user_table);
        //onCreate(db);
    }

    public Boolean insertUserID(String incoming_id,String user_name, String user_job)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("user_id", incoming_id);
        contentValues.put("user_name", user_name);
        contentValues.put("user_job", user_job);
        long result = MyDB.insert("users",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public void createDocTrackTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
         MyDB.execSQL(create_doc_track_table);
         MyDB.close();
    }

    public void createDocRouteTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_route_table);
        MyDB.close();
    }

    public void createDocReceivedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_received_table);
        MyDB.close();
    }

    public void createDocRouteCustomizedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_route_customized_table);
        MyDB.close();
    }

    public void createDocNamesTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_names_table);
        MyDB.close();
    }

    public void createDocInsertedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_inserted_table);
        MyDB.close();
    }

    public void createDocOngoingTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_ongoing);
        MyDB.close();
    }

    public void createDocSummaryTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase();
        MyDB.execSQL(create_doc_summary_table);
        MyDB.close();
    }

    public Boolean dropdoctrackTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS doctrack");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocrouteTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS docroute");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocreceivedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS docreceived");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocroutecustomizedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS docroutecustomized");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocnamesTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS docnames");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocInsertedTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS docinserted");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocOngoingTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS doc_ongoing");
        //MyDB.close();
        return true;
    }

    public Boolean dropdocSummaryTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS doc_summary");
        //MyDB.close();
        return true;
    }

    public Boolean insertDocTrackDetails(String step,String rec_date,String emp_id,String comments)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("step", step);
        contentValues.put("rec_date", rec_date);
        contentValues.put("emp_id", emp_id);
        contentValues.put("comments", comments);
        long result = MyDB.insert("doctrack",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocRouteTable(String doc_step_no,String doc_name ,String emp_id ,String emp_name ,String emp_rank,String dept_name)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("doc_step_no", doc_step_no);
        contentValues.put("doc_name", doc_name);
        contentValues.put("emp_id", emp_id);
        contentValues.put("emp_name", emp_name);
        contentValues.put("emp_rank", emp_rank);
        contentValues.put("dept_name", dept_name);
        long result = MyDB.insert("docroute",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocReceivedTable(String doc_id, String doc_name, String doc_start_date,String doc_due_date,String doc_attachment,
                                          String doc_status, String app_id, String app_name, String starting_emp_id,
                                          String starting_emp_name, String starting_emp_rank, String starting_dept_id,
                                          String starting_dept_name, String sender_emp_id, String sender_emp_name,
                                          String sender_emp_rank, String sender_dept_id, String sender_dept_name, String sender_note)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("doc_id", doc_id);//0
        contentValues.put("doc_name", doc_name);//1
        contentValues.put("doc_start_date", doc_start_date);//2
        contentValues.put("doc_due_date", doc_due_date);//3
        contentValues.put("doc_attachment", doc_attachment);//4
        contentValues.put("doc_status", doc_status);//5
        contentValues.put("app_id", app_id);//6
        contentValues.put("app_name", app_name);//7
        contentValues.put("starting_emp_id", starting_emp_id);//8
        contentValues.put("starting_emp_name", starting_emp_name);//9
        contentValues.put("starting_emp_rank", starting_emp_rank);//10
        contentValues.put("starting_dept_id", starting_dept_id);//11
        contentValues.put("starting_dept_name", starting_dept_name);//12
        contentValues.put("sender_emp_id", sender_emp_id);//13
        contentValues.put("sender_emp_name", sender_emp_name);//14
        contentValues.put("sender_emp_rank", sender_emp_rank);//15
        contentValues.put("sender_dept_id", sender_dept_id);//16
        contentValues.put("sender_dept_name", sender_dept_name);//17
        contentValues.put("sender_note", sender_note);//18
        long result = MyDB.insert("docreceived",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocRouteCustomizedTable(String doc_step_no,String doc_name ,String emp_id ,String emp_name ,String emp_rank,String dept_name)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("doc_step_no", doc_step_no);
        contentValues.put("doc_name", doc_name);
        contentValues.put("emp_id", emp_id);
        contentValues.put("emp_name", emp_name);
        contentValues.put("emp_rank", emp_rank);
        contentValues.put("dept_name", dept_name);
        long result = MyDB.insert("docroutecustomized",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocNamesDetails(String name)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("name", name);
        long result = MyDB.insert("docnames",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocInsertedDetails(String doc_id,String doc_name, String doc_start_date,String doc_due_date,String doc_attachment, String doc_status, String emp_id, String app_id, String emp_name, String dept_name, String app_name)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("doc_id", doc_id);
        contentValues.put("doc_name", doc_name);
        contentValues.put("doc_start_date", doc_start_date);
        contentValues.put("doc_due_date", doc_due_date);
        contentValues.put("doc_attachment", doc_attachment);
        contentValues.put("doc_status", doc_status);
        contentValues.put("emp_id", emp_id);
        contentValues.put("app_id", app_id);
        contentValues.put("emp_name", emp_name);
        contentValues.put("dept_name", dept_name);
        contentValues.put("app_name", app_name);
        long result = MyDB.insert("docinserted",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocSummaryTable(String total,String completed,String ongoing,String returned, String rejected)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("table_id", "1");
        contentValues.put("total", total);
        contentValues.put("completed", completed);
        contentValues.put("ongoing", ongoing);
        contentValues.put("returned", returned);
        contentValues.put("rejected", rejected);
        long result = MyDB.insert("doc_summary",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Boolean insertDocOngoingTable(String doc_id,String doc_name,String start_date,String end_date, String app_id,String app_name)
    {
        SQLiteDatabase MyDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("doc_id", doc_id);
        contentValues.put("doc_name", doc_name);
        contentValues.put("start_date", start_date);
        contentValues.put("end_date", end_date);
        contentValues.put("app_id", app_id);
        contentValues.put("app_name", app_name);
        long result = MyDB.insert("doc_ongoing",null,contentValues);
        MyDB.close();
        if(result==-1) return false;
        else
            return true;
    }

    public Cursor getdoctracking()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM doctrack",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocnames()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM docnames",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocInserted()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM docinserted",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocSummary()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM doc_summary",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocOngoing()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM doc_ongoing",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocRoute()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM docroute",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocReceived()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM docreceived",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocRouteEmpId(String emp_name_coming)
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        String TABLE_USRS="docroute";
        String select = "SELECT emp_id FROM " + TABLE_USRS + " WHERE EMP_NAME"+" = ?";
        Cursor cursor=MyDB.rawQuery(select,new String[]{emp_name_coming});
        //String select = "SELECT emp_id FROM " + TABLE_USRS;
        //Cursor cursor=MyDB.rawQuery(select,null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocReceivedDocId(String doc_id_rec)
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        String TABLE_USRS="docreceived";
        String select = "SELECT * FROM " + TABLE_USRS + " WHERE DOC_ID"+" = ?";
        Cursor cursor=MyDB.rawQuery(select,new String[]{doc_id_rec});
        //String select = "SELECT emp_id FROM " + TABLE_USRS;
        //Cursor cursor=MyDB.rawQuery(select,null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocRouteCustomized()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM docroutecustomized",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getdocRouteCustomizedEmpId(String emp_name_coming)
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        String TABLE_USRS="docroutecustomized";
        String select = "SELECT emp_id FROM " + TABLE_USRS + " WHERE EMP_NAME"+" = ?";
        Cursor cursor=MyDB.rawQuery(select,new String[]{emp_name_coming});
        //String select = "SELECT emp_id FROM " + TABLE_USRS;
        //Cursor cursor=MyDB.rawQuery(select,null);
        //MyDB.close();
        return cursor;
    }

    public Boolean dropUserIdTable()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DROP TABLE IF EXISTS users");
        //MyDB.close();
        return true;
    }

    public Boolean deleteUserId()
    {
        SQLiteDatabase MyDB=this.getWritableDatabase() ;
        MyDB.execSQL("DELETE FROM users");
        //MyDB.close();
        return true;
    }

    public Cursor getuserCount()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT * FROM users",null);
        //MyDB.close();
        return cursor;
    }

    public Cursor getuserID()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT user_id FROM users",null);
        //MyDB.close();
        return cursor;
    }
    public Cursor getuserRole()
    {
        SQLiteDatabase MyDB=this.getReadableDatabase() ;
        Cursor cursor=MyDB.rawQuery("SELECT user_job FROM users",null);
        //MyDB.close();
        return cursor;
    }
}