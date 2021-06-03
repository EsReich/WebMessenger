package com.springboot.crud_security.cache;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.spi.CachingProvider;
import java.time.Duration;

// Рабочий вариант, простейшая настройка (с дефолтной реализацией?)

//@Configuration
//@EnableCaching
//public class CacheConfig {
//    @Bean
//    public CacheManager cacheManager() {
//        SimpleCacheManager cacheManager = new SimpleCacheManager();
//        List<Cache> cacheList = new ArrayList<>();
//        cacheList.add(new ConcurrentMapCache("cache1"));
//        cacheManager.setCaches(cacheList);
//        return cacheManager;
//    }
//}


//Нерабочий вариант

//@Configuration
//@EnableCaching
//public class CacheConfig {
//    @Bean
//    public JCacheCacheManager jCacheCacheManager() {
//        JCacheCacheManager jCacheManager = new JCacheCacheManager(cacheManager());
//        return jCacheManager;
//    }
//
//    @Bean(destroyMethod = "close")
//    public CacheManager cacheManager() {
//
//        ResourcePools resourcePools = ResourcePoolsBuilder.newResourcePoolsBuilder()
//                .heap(2000, EntryUnit.ENTRIES)
//                .offheap(100, MemoryUnit.MB)
//                .build();
//
//        CacheConfiguration<Object,Object> cacheConfiguration =
//                CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class
//                        , Object.class
//                        , resourcePools)
//                        .build();
//
//        Map<String, CacheConfiguration<?, ?>> caches = new HashMap<>();
//        caches.put("myCache", cacheConfiguration);
//
//        EhcacheCachingProvider provider = (EhcacheCachingProvider) Caching
//                .getCachingProvider("org.ehcache.jsr107.EhcacheCachingProvider");
//        org.ehcache.config.Configuration configuration =
//                new DefaultConfiguration(caches, provider.getDefaultClassLoader());
//
//        return  provider.getCacheManager(provider.getDefaultURI(), configuration);
//    }
//}

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager ehCacheManager() {
        CachingProvider provider = Caching.getCachingProvider();
        CacheManager cacheManager = provider.getCacheManager();

        CacheConfigurationBuilder<Object, Object> configuration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        Object.class,
                        Object.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder()
                                .heap(30, EntryUnit.ENTRIES))
//                                .offheap(1, MemoryUnit.MB)) - нужно реализовать сериализацию для энтити, чтобы хранить их вне памяти jvm
                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(20)));

        javax.cache.configuration.Configuration<Object, Object> objectObjectConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(configuration);

        cacheManager.createCache("myCache", objectObjectConfiguration);
        return cacheManager;
    }
}
